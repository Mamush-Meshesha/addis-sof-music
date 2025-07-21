import React, { useCallback, useState } from "react";
import {
  FileIcon,
  FileInfo,
  FilePreview,
  ProgressBarUpload,
  ProgressContainer,
  ProgressFill,
  ProgressLabel,
  RemoveButton,
  UploadIcon,
  UploadSection,
} from "./styled/styledComponents";
import { FaFileAudio, FaTimes, FaUpload } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileSelect,
  onFileRemove,
  accept,
  maxSize,
  currentFile,
  uploadProgress = 0,
  type,
  disabled = false,}) => {
    const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0 && !disabled) {
        onFileSelect(acceptedFiles[0]);
      }
      setIsDragOver(false);
    },
    [onFileSelect, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      [accept]: [],
    },
    maxSize,
    multiple: false,
    disabled,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = () => {
    if (type === "audio") {
      return <FaFileAudio size={20} />;
    }
    return <FaUpload size={20} />;
  };

  const getUploadText = () => {
    if (type === "audio") {
      return {
        title: "Upload Audio File",
        subtitle: "Drop your audio file here or click to browse",
        formats: "MP3, WAV, M4A up to 50MB",
      };
    }
    return {
      title: "Upload Thumbnail",
      subtitle: "Drop your image here or click to browse",
      formats: "JPG, PNG, WebP up to 5MB",
    };
  };

  const uploadText = getUploadText();
  if (currentFile) {
  return (
    <>
      <FilePreview>
        <FileIcon>
          {type === "audio" ? (
            <FaFileAudio size={16} />
          ) : (
            <FaUpload size={16} />
          )}{" "}
        </FileIcon>
        <FileInfo>
           <h5>{currentFile.name}</h5>
          <p>{formatFileSize(currentFile.size)}</p>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <ProgressContainer style={{ marginTop: "0.5rem" }}>
              <ProgressLabel>
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </ProgressLabel>
              <ProgressBarUpload>
                <ProgressFill progress={uploadProgress} />
              </ProgressBarUpload>
            </ProgressContainer>
          )}
        </FileInfo>
          <RemoveButton onClick={onFileRemove} disabled={disabled}>
          <FaTimes size={12} />
        </RemoveButton>
      </FilePreview>
    </>
  );
}
 return (
    <UploadSection
      {...getRootProps()}
      className={isDragActive || isDragOver ? "dragover" : ""}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <input {...getInputProps()} />

      <UploadIcon>{getFileIcon()}</UploadIcon>

      <h4 style={{ margin: "0 0 0.5rem 0", color: "hsl(var(--foreground))" }}>
        {uploadText.title}
      </h4>

      <p
        style={{
          margin: "0 0 0.5rem 0",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        {uploadText.subtitle}
      </p>

      <p
        style={{
          margin: 0,
          fontSize: "0.75rem",
          color: "hsl(var(--muted-foreground))",
          opacity: 0.8,
        }}
      >
        {uploadText.formats}
      </p>
    </UploadSection>
  );
};

export default FileUpload;
