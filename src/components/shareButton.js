import React from 'react'
import { Facebook, Twitter, Linkedin } from 'react-feather'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'

export const ShareButtons = ({ url, title, description }) => (
  <>
    <div className="post-meta-share-icons row d-flex flex-row-reverse">
      <div className="btn btn-primary btn-sm text-white col-6 col-md-3 col-lg-3 col-xl-3">
        <FacebookShareButton url={url} quote={description}>
          <Facebook strokeWidth={1.25} /> <small>Share on Facebook </small>
        </FacebookShareButton>
      </div>
    </div>
    <div className="post-meta-share-icons row d-flex flex-row-reverse mt-2">
      <div className="btn btn-secondary btn-sm text-white col-6 col-md-3 col-lg-3 col-xl-3">
        <LinkedinShareButton url={url} title={title} summary={description}>
          <Linkedin strokeWidth={1.25} /> <small>Share on Linkedin </small>
        </LinkedinShareButton>
      </div>
    </div>
    <div className="post-meta-share-icons row d-flex flex-row-reverse mt-2">
      <div className="btn btn-info btn-sm text-white col-6 col-md-3 col-lg-3 col-xl-3">
        <TwitterShareButton url={url} title={description}>
          <Twitter strokeWidth={1.25} /> <small>Share on Twitter </small>
        </TwitterShareButton>
      </div>
    </div>
  </>
)
