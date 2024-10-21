import { useState } from 'react';
import { Button } from '../uikit/button';
import styled, { css, keyframes } from 'styled-components';
import { useMountAnim } from '../hooks/useMountAnim';

export type Item = { name: string; children: Item[]; id: string };

const unmountAnim = keyframes`
    from { grid-template-rows: 1fr; }
    to { grid-template-rows: 0fr;}
`;

const mountAnim = keyframes`
    from { grid-template-rows: 0fr; }
    to { grid-template-rows: 1fr; }
`;

const Row = styled.div`
    display: flex;
`;

const Nested = styled.div<{ $unmounting: boolean }>`
    width: 300px;
    display: grid;
    animation-name: ${mountAnim};
    ${({ $unmounting }) =>
        $unmounting &&
        css`
            animation-name: ${unmountAnim};
        `}
`;

const Wrapper = styled.div`
    overflow: hidden;
    width: 300px;
    background-color: rgba(0, 0, 0, 0.1);
`;

const TestItem = ({ item }: { item: Item }) => {
    const [opened, setOpened] = useState(false);
    const {
        mounted,
        unmounting,
        styles: animStyles,
    } = useMountAnim(opened, 300);
    return (
        <>
            <Row>
                {item.name}

                {item.children.length > 0 && (
                    <>
                        <Button onClick={() => setOpened((prev) => !prev)}>
                            {opened ? '<' : '>'}
                        </Button>
                    </>
                )}
            </Row>

            {mounted && (
                <Nested $unmounting={unmounting} style={animStyles}>
                    <Test items={item.children} />
                </Nested>
            )}
        </>
    );
};

export const Test = ({ items }: { items: Item[] }) => {
    return (
        <Wrapper>
            {items.map((item) => (
                <TestItem key={item.id} item={item} />
            ))}
        </Wrapper>
    );
};
