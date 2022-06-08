import React from "react";
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';

const CommentPage = ({ disqusConfig }) => {

  return (
    <>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      <Disqus config={disqusConfig} />
    </>
)};

export default CommentPage;