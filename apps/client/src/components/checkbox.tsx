import styled from 'styled-components';
import { css } from 'styled-components';
import { transition } from '../shared/styles/transition';
import { hover } from '../shared/styles/hover';

export const Checkbox = ({
    isChecked = false,
    toggleIsChecked,
}: {
    isChecked?: boolean;
    toggleIsChecked: () => void;
}) => {
    return (
        <Wrapper
            $isChecked={isChecked}
            onKeyDown={(e) =>
                (e.code === 'Space' || e.code === 'Enter') && toggleIsChecked()
            }
        >
            <Input
                checked={isChecked}
                type='checkbox'
                onChange={toggleIsChecked}
            />
            <CheckMark />
        </Wrapper>
    );
};

const Wrapper = styled.label.attrs({ tabIndex: 0 })<{ $isChecked: boolean }>`
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    position: relative;
    overflow: hidden;

    ${transition('border-color', 'outline-color')}

    border: 2px solid ${({ theme }) => theme.button.outline.border};

    ${({ $isChecked, theme }) =>
        $isChecked
            ? css`
                  border-color: ${theme.focusOutline};

                  div {
                      background-color: ${theme.focusOutline};
                  }
              `
            : hover(css`
                  border-color: ${({ theme }) => theme.new[5]};
                  div {
                      background-color: ${({ theme }) => theme.new[5]};
                  }
              `)}
`;

const Input = styled.input`
    position: absolute;
    left: 50px;
    visibility: hidden;
`;

const CheckMark = styled.div`
    width: 80%;
    height: 80%;
    inset: 10%;
    border-radius: 3px;

    position: absolute;

    ${transition('background-color')}
`;
