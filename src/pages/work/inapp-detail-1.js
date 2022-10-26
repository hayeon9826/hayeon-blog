import React from 'react'
import Layout from '../../components/layout'
import SyntaxHighlighter from 'react-syntax-highlighter'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'

const Work = () => {
  const beforeCode = `
  // 페이지 넘길 때 마다 API 요청
  const updateAddress = async (data: AddressType): Promise<void> => {
    const request = addressRequest[data.addressType](data);

    const response = await fetch('/api/setAddress', {
      body: JSON.stringify(request),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (!response.ok) {
      throw Error();
    }
  }
  
  <SubmitButton
    onClick={updateAddress}
  >
  </SubmitButton>`

  const afterCode = `
  // 최종 폼이 아닌, 중간 단계의 폼에서는 reducer로 상태만 업데이트
  const updateAddress = useCallback(() => {
    dispatch(
        setAddress({
          address: addressValue,
          detailAddress: detailAddressValue,
        }),
      );
  })
  
  <SubmitButton
    onClick={updateAddress}
  >
  </SubmitButton>`

  const afterCode2 = `
  // 최종 폼에서만 reducer로 저장된 상태값 서버에 최종 반영
  const submitForm = useCallback(() => {
      addressMutation({ addressData: { address, detailAddress } });
      ...
  }, [addressMutation, detailAddress, address]);
  
  <SubmitButton
    onClick={submitForm}
  >
  </SubmitButton>`
  return (
    <>
      <Layout title="Hayeon Resume">
        <section className="about-work mb-32 mt-20">
          <div className="mt-5">
            <h4>What I did.</h4>
            <ul className="bulleted-list">
              <li>
                약정(Contract)에 들어가는 여러가지 상태들의 type을 정의하고, 매 단계가 끝날 때 마다 폼으로 제출하는
                상태값들을 dispatch로 저장할 수 있도록 코드를 개선하였습니다.
              </li>
              <li>
                기존에 '확인' 버튼을 누를 때마다 DB로 직접 호출하는 코드가 비효율적이라고 생각되어, 프론트에서 Redux로
                상태를 저장할 수 있도록 개선하였습니다.
              </li>
              <li>
                15회이상 여러번 호출되던 API 횟수를 줄여, 불필요한 서버 요청을 5단계로 줄일 수 있었고, 기존 데이터를
                참조하는 코드에서 Redux의 상태값을 바로 가져올 수 있도록 하여 페이지 전환 속도를 개선하였습니다.
              </li>
            </ul>
            <h4>Before</h4>
            <small>* 예시 코드입니다.</small>
            <SyntaxHighlighter language="javascript" style={prism}>
              {beforeCode}
            </SyntaxHighlighter>

            <h4>After</h4>
            <small>* 예시 코드입니다.</small>

            <SyntaxHighlighter language="javascript" style={prism}>
              {afterCode}
            </SyntaxHighlighter>
            <SyntaxHighlighter language="javascript" style={prism}>
              {afterCode2}
            </SyntaxHighlighter>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Work
