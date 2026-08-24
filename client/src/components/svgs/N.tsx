const NSvg = (props: { className: string; fill?: 'white' | 'black' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="416"
    height="504"
    viewBox="0 0 416 504"
    fill="none"
    {...props}
  >
    <path
      d="M415.1 504H251.3L0 0H162.4L415.1 504ZM415.1 425.6L282.1 167.3V0H415.1V425.6ZM28.7 130.9L161.7 399.7V504H28.7V130.9Z"
      fill={props.fill}
    />
  </svg>
);
export default NSvg;
