import styled, { css } from "styled-components";

type DropContainerProps = {
  isDragActive?: boolean;
  isDragReject?: boolean;
}

type UploadMessageProps = {
  type?: "default" | "error" | "success";
}

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5'
}

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const Container = styled.div`
  span {
    font-size: 14px;
  }
`;

export const DropContainer = styled.div<DropContainerProps>`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

export const UploadMessage = styled.p<UploadMessageProps>`
  display: flex;
  color: ${props => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;