/** External Dependencies */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import FontBold from '@scaleflex/icons/font-bold';
import FontItalic from '@scaleflex/icons/font-italic';

/** Internal Dependencies */
import { TOOLS_IDS, TRANSFORMERS_LAYER_ID } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import { StyledIconWrapper } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import { ENABLE_TEXT_CONTENT_EDIT } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import { useStore } from 'hooks';
import {
  StyledFontFamilySelect,
  StyledFontSizeInput,
  StyledToolsWrapper,
  StyledTextControlsContainer,
  StyledFontCardsContainer,
  StyledFontCard,
  StyledFontPreview,
  StyledFontLabel,
} from './TextOptions.styled';
import {
  textOptionsPopupComponents,
  TEXT_POPPABLE_OPTIONS,
} from './TextOptions.constants';
import {
  activateTextChange,
  deactivateTextChange,
} from './handleTextChangeArea';

const TextControls = ({ text, saveText, children }) => {
  const { dispatch, textIdOfEditableContent, designLayer, t, config } =
    useStore();
  const { useCloudimage } = config;
  const { fonts = [], onFontChange } = config[TOOLS_IDS.TEXT];

  const changeTextProps = useCallback(
    (e) => {
      const { name, value, type } = e.target;
      const newValue = type === 'number' ? restrictNumber(value, 1, 500) : value;
      saveText((latestText) => ({
        id: latestText.id,
        [name]: newValue,
        // Force save when text content changes
        shouldSave: name === 'text' ? true : false,
      }));
    },
    [saveText],
  );

  const changeFontFamily = useCallback(
    (newFontFamily) => {
      changeTextProps({
        target: { name: 'fontFamily', value: newFontFamily },
      });
      if (
        text.fontFamily !== newFontFamily &&
        typeof onFontChange === 'function'
      ) {
        const reRenderCanvasFn = designLayer.draw.bind(designLayer);
        onFontChange(newFontFamily, reRenderCanvasFn);
      }
    },
    [changeTextProps, text, designLayer],
  );

  const changeFontStyle = useCallback(
    (newStyle) => {
      let fontStyle = text.fontStyle?.replace('normal', '').split(' ') || [];
      if (Object.keys(fontStyle).length > 0 && fontStyle.includes(newStyle)) {
        fontStyle = fontStyle.filter((style) => style !== newStyle);
      } else {
        fontStyle.push(newStyle);
      }

      changeTextProps({
        target: {
          name: 'fontStyle',
          value: fontStyle.join(' ').trim() || 'normal',
        },
      });
    },
    [text],
  );

  const disableTextEdit = useCallback(() => {
    dispatch({
      type: ENABLE_TEXT_CONTENT_EDIT,
      payload: {
        textIdOfEditableContent: null,
      },
    });
  }, []);

  const changeTextContent = useCallback((newContent) => {
    changeTextProps({
      target: {
        name: 'text',
        value: newContent,
      },
    });
    disableTextEdit();
  }, []);

  useEffect(() => {
    let transformer;
    if (textIdOfEditableContent && text.id === textIdOfEditableContent) {
      const canvasStage = designLayer.getStage();
      [transformer] = canvasStage.findOne(`#${TRANSFORMERS_LAYER_ID}`).children;
      activateTextChange(
        textIdOfEditableContent,
        canvasStage,
        transformer,
        changeTextContent,
        disableTextEdit,
      );
    }

    return () => {
      if (transformer && textIdOfEditableContent) deactivateTextChange();
    };
  }, [textIdOfEditableContent]);

  return (
    <StyledTextControlsContainer>
      <AnnotationOptions
        className="FIE_text-tool-options"
        annotation={text}
        updateAnnotation={saveText}
        morePoppableOptionsPrepended={!useCloudimage ? TEXT_POPPABLE_OPTIONS : []}
        moreOptionsPopupComponentsObj={
          !useCloudimage ? textOptionsPopupComponents : {}
        }
        t={t}
      >
        <StyledFontSizeInput
          className="FIE_text-size-option"
          value={text.fontSize || ''}
          name="fontSize"
          onChange={changeTextProps}
          inputMode="numeric"
          type="number"
          size="sm"
          placeholder={t('size')}
        />

        <StyledToolsWrapper>
          {!useCloudimage && (
            <>
              <StyledIconWrapper
                className="FIE_text-bold-option"
                active={(text.fontStyle || '').includes('bold')}
                onClick={() => changeFontStyle('bold')}
                watermarkTool
              >
                <FontBold size={20} />
              </StyledIconWrapper>
              <StyledIconWrapper
                className="FIE_text-italic-option"
                active={(text.fontStyle || '').includes('italic')}
                onClick={() => changeFontStyle('italic')}
                watermarkTool
              >
                <FontItalic size={20} />
              </StyledIconWrapper>
            </>
          )}
          {children}
        </StyledToolsWrapper>
      </AnnotationOptions>
      
      {Array.isArray(fonts) && fonts.length > 1 && (
        <StyledFontCardsContainer className="FIE_text-font-family-option">
          {fonts.map((fontFamily = '') => {
            const fontValue = fontFamily.value ?? fontFamily;
            const fontLabel = fontFamily.label ?? fontFamily;
            const isSelected = text.fontFamily === fontValue;
            
            return (
              <StyledFontCard
                key={fontValue}
                className="FIE_text-font-family-item"
                active={isSelected}
                onClick={() => changeFontFamily(fontValue)}
              >
                <StyledFontPreview fontFamily={fontValue}>
                  Abc
                </StyledFontPreview>
                <StyledFontLabel>
                  {fontLabel}
                </StyledFontLabel>
              </StyledFontCard>
            );
          })}
        </StyledFontCardsContainer>
      )}
    </StyledTextControlsContainer>
  );
};

TextControls.defaultProps = {
  children: null,
};

TextControls.propTypes = {
  text: PropTypes.instanceOf(Object).isRequired,
  saveText: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default TextControls;
