import styled from 'styled-components';
import { staticStyles } from '../shared/consts/styles/static';
import { transition } from '../shared/utils/styles/transition';
import { typography } from '../shared/utils/styles/typography';
import { useTyping } from '../shared/hooks/useTyping';
import { useEffect, useState } from 'react';
import { setSearchParam, useSearchParam } from '../modules/url';

const Wrapper = styled.input`
    ${transition('border-color', 'outline-color', 'color')}
    ${typography()}
    display: flex;
    align-items: center;
    padding: ${staticStyles.paddings.rectangle};
    height: ${staticStyles.strokeHeight.m};
    min-width: 0px;
    flex-grow: 1;

    border: ${staticStyles.border.width.m} solid
        ${({ theme }) => theme.input.border};
    color: ${({ theme }) => theme.input.text};

    &::placeholder {
        ${transition('color')}

        color: ${({ theme }) => theme.input.placeholder};
    }

    border-radius: ${staticStyles.border.radius};
`;

export const Search = () => {
    const [searchPlaceholder, setSearchPlaceholder] = useState('');

    const { start, stop } = useTyping({
        loop: true,
        phrases: [
            'iphone 16 pro',
            'механическая клавиатура',
            'планшет Samsung Galaxy',
            'умные часы',
            'телевизор LG OLED',
            'беспроводные наушники',
            'игровая приставка PlayStation 5',
            'фитнес-трекер',
            'ноутбук Lenovo',
            'пылесос Dyson',
            'смартфон Xiaomi',
            'камера GoPro',
            'геймпад Xbox',
        ],
        writeSpeed: 100,
        deleteSpeed: 50,
        deleteInterval: 1000,
        onWriteChar: (char) =>
            setSearchPlaceholder((prev) => prev.concat(char)),
        onDelete: () => setSearchPlaceholder((prev) => prev.slice(0, -1)),
        onUpdate: (value) => setSearchPlaceholder(value),
        onUnmount: () => setSearchPlaceholder(''),
    });

    useEffect(() => {
        start();
    }, []);

    const searchValue = useSearchParam('search');

    return (
        <Wrapper
            placeholder={searchPlaceholder}
            value={searchValue ?? ''}
            onChange={(e) =>
                setSearchParam(
                    'search',
                    e.target.value === '' ? null : e.target.value,
                    true,
                )
            }
            onFocus={stop}
        />
    );
};
