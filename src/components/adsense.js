import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`

export const AdSense = props => {
  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || []
      adsbygoogle.push({})
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Container {...props}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9858678688044633"
        data-ad-slot="6568222285"
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
    </Container>
  )
}
