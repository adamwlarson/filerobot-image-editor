/** External Dependencies */
import styled from 'styled-components';
import Input from '@scaleflex/ui/core/input';
import Select from '@scaleflex/ui/core/select';

const StyledFontFamilySelect = styled(Select)`
  width: 160px;
`;

const StyledFontSizeInput = styled(Input)`
  width: 72px;
`;

const StyledToolsWrapper = styled.div`
  display: flex;
`;

const StyledTextControlsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledFontCardsContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  padding: 12px 0 4px 0;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
    
    &:hover {
      background: #a8a8a8;
    }
  }
`;

const StyledFontCard = styled.div`
  min-width: 120px;
  height: 70px;
  border: 2px solid ${({ active }) => active ? '#4078ff' : '#e8e8e8'};
  border-radius: 8px;
  background: ${({ active }) => active ? '#f7f9ff' : '#ffffff'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ active }) => active ? '#4078ff' : '#c1c1c1'};
    background: ${({ active }) => active ? '#f7f9ff' : '#f8f8f8'};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledFontPreview = styled.div`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  color: #333;
  text-align: center;
  line-height: 1.3;
  margin-bottom: 2px;
`;

const StyledFontLabel = styled.div`
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 11px;
  color: #666;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export { 
  StyledFontFamilySelect, 
  StyledFontSizeInput, 
  StyledToolsWrapper,
  StyledTextControlsContainer,
  StyledFontCardsContainer,
  StyledFontCard,
  StyledFontPreview,
  StyledFontLabel
};
