import React, { useState } from "react";
import {
  FileIcon,
  FileInfo,
  FilePreview,
  ProgressBarUpload,
  ProgressContainer,
  ProgressFill,
  ProgressLabel,
  RemoveButton,
} from "./styled/styledComponents";
import { FaFileAudio, FaTimes, FaUpload } from "react-icons/fa";

const FileUpload = ({type}) => {
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
          <h5>mamush</h5>
          <ProgressContainer>
            <ProgressLabel>
              <span>Uploading...</span>
            </ProgressLabel>
            <ProgressBarUpload>
                <ProgressFill progress={50} />
              </ProgressBarUpload>
          </ProgressContainer>
        </FileInfo>
          <RemoveButton onClick={() =>console.log("clicked")}>
          <FaTimes size={12} /> 
        </RemoveButton>
      </FilePreview>
    </>
  );
};

export default FileUpload;
