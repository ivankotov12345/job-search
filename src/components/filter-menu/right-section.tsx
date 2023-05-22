import { RightSectionPropsType } from '../../types/props-type'

export const RightSection = ({ filterMenuActive }: RightSectionPropsType) => {

  return (
    <>
    {filterMenuActive 
      ? <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 7L8.78095 1.66938C8.33156 1.2842 7.66844 1.2842 7.21905 1.66938L1 7" stroke="#5E96FC" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      : <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>}

    </>
  )
}
