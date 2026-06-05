import React, { useCallback } from 'react';
import { Container } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { api, notifier } from '../../lib';
import async from 'async';
import { ButtonBasic, AppIcon } from '../../atoms';

export const ThemeFileUpload = (props) => {
  const { theme, setUploadFile, imageField, icon = false } = props;

  const getThemeUploadUrl = useCallback((objectPath) => {
    return `${theme.baseUploadUrl}/${objectPath}`;
  }, [ theme ]);

  const imageSet = (field) => typeof field === 'string' && field.trim() !== '';

  const onDrop = (acceptedFiles) => {
    async.each(acceptedFiles, (file, next) => {
      const uploadPath = `${Date.now()}-${file.name}`;

      if (file) {
        api.put(`themes/${theme._id}/upload`, {
          filename: uploadPath,
          filetype: file.type,
          filesize: file.size
        }).then(({ data }) => {
          const { objectPath, signedPutUrl } = data;
          fetch(signedPutUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
              'Content-Length': file.size,
              'Content-Disposition': `inline; filename="${uploadPath}"`,
            }
          }).then((resp) => {
            setUploadFile(objectPath);
          }).catch(err => {
            console.error(err);
            notifier.bad(err);
          });
        }).catch(err => {
          console.error(err);
          notifier.bad(err);
        });
      }
    }, (err) => {
      if (err) {
        console.warn('unable to upload file', err);
      }
    });
  };

  const clearUploadFile = () => {
    if (window.confirm('Are you sure?')) {
      setUploadFile('');
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="ThemeFileUpload">
      <Container fluid>
        <span {...getRootProps()}
          className="input messageAttachment"
        >
          <input {...getInputProps()} />

          <ButtonBasic onClick={open}>{imageField ? 'Change file' : 'Add file'}</ButtonBasic>
        </span>
        {imageSet(imageField) && (
          <ButtonBasic className='ml-3' onClick={clearUploadFile}>
            <AppIcon iconName={'trash'} />
          </ButtonBasic>
        )}
        <div className="mt-3">
          {imageSet(imageField) && <img className={icon ? 'uploaded-icon': ''} src={getThemeUploadUrl(imageField)} alt={imageField}  width="200" height="auto"/>}
        </div>
      </Container>
    </div>
  );
};
