import { useRef, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.main`
  position: relative;
`;

const Section = styled.section`
  position: relative;
`;

const InnerSection = styled.div`
  position: relative;
  max-width: 100%;
  margin-top: 1rem;
  /* padding: 1rem; */
`;

const AccordionContainer = styled.div``;

const AccordionInner = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #7a7a76;
  border-radius: 4px;
`;

const AccordionItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #7a7a76;
  }
`;

const AccordionTitle = styled.h3`
  margin: 0;
  padding: 1rem;
  letter-spacing: 0.3px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;

const AccordionBody = styled.div`
  display: block;
  position: relative;
  padding: 0;
  margin: 0;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;

  ${({ active, bodyHeight }) =>
    active &&
    css`
      height: ${bodyHeight}px;
    `}
`;

const AccordionContent = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: var(--color-grey-800);
  letter-spacing: 0.2px;
  padding: 0 1rem 1rem;
  height: auto;
`;

const sampleAccordionData = [
  {
    title: "Payment",
    content:
      "Goal Direct accepts payment via major credit and debit cards, and Klarna*.\nWe also accept Apple Pay & Google Pay, which provides 'Quick Checkout' removing the need to enter your address and payment details.",
  },
  {
    title: "Shipping & Delivery",
    content:
      "Goal Direct offers quick dispatch and worldwide delivery via a range of the world's best and most trusted delivery carriers.",
  },
  {
    title: "Returns",
    content:
      "Goal Direct offer FREE Online UK Returns on all items within 28 days of date of delivery.\nItems must be returned in their original condition, including any accessories that came with the product.",
  },
  {
    title: "Quality Guarantee",
    content:
      "Goal Direct is an approved retail company in partnership with the worlds leading football brands.\nAll of the products are 100% legitimate items.",
  },
];

const AccordionItems = ({
  accordionContent,
  refs,
  currentAccordion,
  setCurrentAccordion,
  setBodyHeight,
  bodyHeight,
}) => {
  const handleClick = (index) => {
    // If the clicked section is already open, close it
    if (currentAccordion === index) {
      setCurrentAccordion(-1);
      setBodyHeight(0); // Reset the body height
    } else {
      // Otherwise, open the clicked section
      setCurrentAccordion(index);
      setBodyHeight(refs[index].current.clientHeight);
    }
  };

  return accordionContent.map(({ title, content }, i) => (
    <AccordionItem key={`accordion-item-${i}`}>
      <AccordionTitle onClick={() => handleClick(i)}>
        <span>{title}</span>
        {/* <ArrowIcon open={currentAccordion === i} /> */}
      </AccordionTitle>
      <AccordionBody active={currentAccordion === i} bodyHeight={bodyHeight}>
        <AccordionContent ref={refs[i]}>
          {content.split("\n").map((paragraph, index) => (
            <p key={`paragraph-${index}`}>{paragraph}</p>
          ))}
        </AccordionContent>
      </AccordionBody>
    </AccordionItem>
  ));
};

function Accordion2() {
  const [currentAccordion, setCurrentAccordion] = useState(-1);
  const [bodyHeight, setBodyHeight] = useState(0);

  const item0 = useRef(null);
  const item1 = useRef(null);
  const item2 = useRef(null);
  const item3 = useRef(null);
  const item4 = useRef(null);
  const item5 = useRef(null);

  const refs = [item0, item1, item2, item3, item4, item5];

  return (
    <>
      <Container>
        <Section>
          <InnerSection>
            <AccordionContainer>
              <AccordionInner>
                <AccordionItems
                  accordionContent={sampleAccordionData}
                  refs={refs}
                  currentAccordion={currentAccordion}
                  setCurrentAccordion={setCurrentAccordion}
                  setBodyHeight={setBodyHeight}
                  bodyHeight={bodyHeight}
                />
              </AccordionInner>
            </AccordionContainer>
          </InnerSection>
        </Section>
      </Container>
    </>
  );
}

export default Accordion2;
