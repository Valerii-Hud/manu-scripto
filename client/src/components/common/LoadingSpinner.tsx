interface ViewProps {
  sizeClass: string;
}

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClass = `loading-${size}`;
  return <View sizeClass={sizeClass} />;
};

const View = ({ sizeClass }: ViewProps) => (
  <span className={`loading loading-spinner ${sizeClass}`} />
);

export default LoadingSpinner;
