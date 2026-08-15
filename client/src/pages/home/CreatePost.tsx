import { CiImageOn } from 'react-icons/ci';
import { BsEmojiSmileFill } from 'react-icons/bs';
import {
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type RefObject,
  type SetStateAction,
} from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, HttpMethod, type CreatePostData } from '../../api/api';
import type { IUser } from '../../types/interfaces';

interface ViewProps {
  authUser: IUser;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  imgRef: RefObject<HTMLInputElement | null>;
  localDefault: string | false | null | undefined;
  toggleHidePost: () => void;
  handleImgChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isPosting: boolean;
}

const CreatePost = () => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(['authUser']) as IUser;

  const imgRef = useRef<HTMLInputElement>(null);
  const localDefault =
    authUser.isHidden && localStorage.getItem('default_is_hide_post');

  const [isHiddenPost, setIsHiddenPost] = useState(Boolean(localDefault));
  const toggleHidePost = () => {
    localStorage.setItem('default_is_hide_post', String(!isHiddenPost));
    setIsHiddenPost(!isHiddenPost);
  };

  const { mutate: createPost, isPending: isPosting } = useMutation({
    mutationFn: async (data: CreatePostData) => {
      return await api({
        data,
        method: HttpMethod.POST,
        endpoint: '/api/v1/posts/create',
        successMessage: 'Post created successfully',
      });
    },
    onSuccess: () => {
      setText('');
      setImage('');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({ text, image, isHidden: isHiddenPost });
  };

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files)
      return { error: 'Please Provide Any Files' };

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <View
      authUser={authUser}
      handleSubmit={handleSubmit}
      text={text}
      setText={setText}
      image={image}
      setImage={setImage}
      imgRef={imgRef}
      localDefault={localDefault}
      toggleHidePost={toggleHidePost}
      handleImgChange={handleImgChange}
      isPosting={isPosting}
    />
  );
};

const View = ({
  authUser,
  handleSubmit,
  text,
  setText,
  image,
  setImage,
  imgRef,
  localDefault,
  toggleHidePost,
  handleImgChange,
  isPosting,
}: ViewProps) => (
  <div className="flex p-4 items-start gap-4 border-b border-gray-700">
    <div className="avatar">
      <div className="w-8 rounded-full">
        <img src={authUser?.profileImage || '/avatar-placeholder.png'} />
      </div>
    </div>
    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <textarea
        className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800"
        placeholder="What is happening?!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {image && (
        <div className="relative w-72 mx-auto">
          <IoCloseSharp
            className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
            onClick={() => {
              setImage('');
              if (!imgRef || !imgRef.current)
                return { error: 'No Image Provided' };
              imgRef.current.value = '';
            }}
          />
          <img
            src={image}
            className="w-full mx-auto h-72 object-contain rounded"
          />
        </div>
      )}

      <div className="flex justify-between border-t py-2 border-t-gray-700">
        <div className="flex gap-1 items-center">
          <CiImageOn
            className="fill-primary w-6 h-6 cursor-pointer"
            onClick={() => imgRef.current && imgRef.current.click()}
          />
          <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          {authUser.isHidden === true && (
            <input
              type="checkbox"
              className="toggle rounded-lg"
              defaultChecked={Boolean(localDefault)}
              onClick={toggleHidePost}
            ></input>
          )}
        </div>
        <input type="file" hidden ref={imgRef} onChange={handleImgChange} />
        <button className="btn btn-primary rounded-full btn-sm text-white px-4">
          {isPosting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  </div>
);

export default CreatePost;
