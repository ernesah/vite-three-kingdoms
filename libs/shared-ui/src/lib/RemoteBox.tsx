import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  border: 2px solid #aaa;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
  background: #f9f9f9;
  text-align: center;

  a {
    font-weight: bold;
    text-decoration: none;
    color: #333;

    &:hover {
      cursor: pointer;
      color: #0070f3;
    }
  }
`;

type Props = {
  name: string;
  href: string;
};

export const RemoteBox = ({ name, href }: Props) => (
  <Box>
    <a href={href} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  </Box>
);
