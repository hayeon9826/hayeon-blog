import React from 'react'

const NoPostPage = ({ text = '' }) => {
  return (
    <>
      <p className="py-12 text-center">
        <small>{text || '게시글이 없습니다. 다른 카테고리를 선택해주세요 :)'}</small>
      </p>
    </>
  )
}

export default NoPostPage
