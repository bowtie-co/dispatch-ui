import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from '../../hooks';

export const PostImage = (props) => {
  const { post, theme } = props;
  const dimensions = useWindowDimensions();
  const maxWidth = 640;
  const [ width, setWidth ] = useState(dimensions.width);
  const [ height, setHeight ] = useState(dimensions.height);

  const borderStyles = {
      borderWidth: theme.enableImageBorder ? '2px' : '0',
      borderStyle: theme.enableImageBorder ? 'solid': 'none',
      borderColor: theme.enableImageBorder ? theme.imageBorderColor : 'transparent'
    };
  useEffect(() => {
    const newWidth = dimensions.width - 40;
    setWidth(newWidth < maxWidth ? newWidth : maxWidth);
    setHeight(width / 16 * 9);
  }, [ width, dimensions ]);

  return (
    <div className={'SharePostImage'}>
      {/^video\//.test(post.filetype) ? (
        <video
          controls
          autoPlay
          poster={post.posterUrl}
          src={post.renderedUrl}
        >
          Sorry, your browser doesn't support HTML5 <code>video</code>, but you can
          <a href={post.renderedUrl} target="_blank" rel="noopener noreferrer">download this video here</a>.
        </video>
      ) : (
        <img
          className={`share-frame`}
          title={post.filename}
          alt={post.filename}
          src={post.renderedUrl}
          width={width}
          height={height}
          frameBorder={'0'}
          style={borderStyles}
          allowFullScreen
        />
      )}
    </div>
  );
};
