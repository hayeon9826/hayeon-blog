import React from "react";
import Layout from './layout'
import Bio from './bio'
import Seo from './seo'
import Category from './category'

const NoPostPage = ({ location, siteTitle }) => {

  return (
    <>
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <Category location={location}/>
        <p className="py-12 text-center">
          <small>게시글이 없습니다. 다른 카테고리를 선택해주세요 :)</small>
        </p>
      </Layout>
    </>
)};

export default NoPostPage;