import styled, { css } from 'styled-components';
import {
    toggleAreShownProductFilters,
    useAreShownProductFilters,
} from '../../hooks/useAppState';
import { typography } from '../../shared/utils/styles/typography';
import { Dialog } from './shared';
import { DialogOutlineButton } from './shared/outlineButton';
import { DialogContentWrapper } from './shared/wrapper';
import { DialogSecondaryButton } from './shared/secondaryButton';
import { ButtonText } from '../buttonText';
import {
    getSearchParam,
    setSearchParam,
    useSearchParam,
} from '../../modules/url';
import { useApi } from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import { PageLoader } from '../pageLoader';
import { DialogRow } from './shared/row';
import { apiSchema } from '@shop/shared';
import { z } from 'zod';
import { hover } from '../../shared/utils/styles/hover';

const DialogWrapper = styled.div`
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-rows: auto 1fr;
    gap: 10px;
    padding: 2px;
`;

const FiltersRow = styled.div`
    display: flex;
    overflow: auto;
    flex-direction: column;
    gap: 12px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* border: 1px solid red; */
`;

const Btn = styled(DialogOutlineButton)<{ $isActivated: boolean }>`
    ${({ $isActivated, theme }) =>
        $isActivated &&
        css`
            background-color: ${theme.dialog.foreground.background};

            ${hover(css`
                background-color: ${theme.dialog.foreground.hover.background};
                border-color: ${theme.dialog.foreground.hover.background};
            `)}
            &:active {
                border-color: ${theme.dialog.foreground.active.background};

                background-color: ${theme.dialog.foreground.active.background};
            }
        `}
    height: 28px;
    padding: 0 6px;
    flex-grow: 0;
`;

const FeatureWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0;
`;

const OptionsWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
`;

const sortingSections: {
    key: string;
    title: string;
    ascTitle: string;
    descTitle: string;
}[] = [
    {
        key: 'price',
        title: 'По цене',
        ascTitle: 'Сначала дешёвые',
        descTitle: 'Сначала дорогие',
    },
];

export const ProductFiltersDialog = () => {
    const areShownProductFilters = useAreShownProductFilters();
    const [sorting, setSorting] = useState<
        Record<string, 'desc' | 'asc' | undefined>
    >({});
    const [filters, setFilters] = useState<
        NonNullable<
            z.infer<(typeof apiSchema)['getFiltersForCategory']['return']>
        >
    >({});

    useEffect(() => {
        if (areShownProductFilters) {
            const searchSortingJson = getSearchParam('sorting') ?? '';
            try {
                setSorting(
                    z
                        .record(z.string(), z.enum(['desc', 'asc']))
                        .parse(JSON.parse(searchSortingJson)),
                );
            } catch {
                setSorting({});
            }

            const searchFiltersJson = getSearchParam('filters') ?? '';
            try {
                setFilters(
                    z
                        .record(z.string(), z.string().array())
                        .parse(JSON.parse(searchFiltersJson)),
                );
            } catch {
                setFilters({});
            }
        } else {
            setFilters({});
            setFilters({});
        }
    }, [areShownProductFilters]);

    const categoryId = useSearchParam('categoryId') ?? null;
    const { call, data, status } = useApi('getFiltersForCategory');

    useEffect(() => {
        call({ categoryId });
    }, []);

    return (
        <Dialog
            maxHeight='500px'
            maxWidth='500px'
            contentSlot={
                <DialogWrapper>
                    {status === 'success' ? (
                        <FiltersRow>
                            <Section>
                                <TypoHeadSection>Сортировать</TypoHeadSection>
                                {sortingSections.map((section) => (
                                    <FeatureWrapper>
                                        <TypoHeadFilter>
                                            {section.title}
                                        </TypoHeadFilter>
                                        <OptionsWrapper>
                                            <Btn
                                                $isActivated={
                                                    sorting[section.key] ===
                                                    'asc'
                                                }
                                                onClick={() =>
                                                    setSorting((prev) => ({
                                                        ...prev,
                                                        [section.key]:
                                                            prev[
                                                                section.key
                                                            ] === 'asc'
                                                                ? undefined
                                                                : 'asc',
                                                    }))
                                                }
                                            >
                                                <ButtonText>
                                                    {section.ascTitle}
                                                </ButtonText>
                                            </Btn>
                                            <Btn
                                                $isActivated={
                                                    sorting[section.key] ===
                                                    'desc'
                                                }
                                                onClick={() =>
                                                    setSorting((prev) => ({
                                                        ...prev,
                                                        [section.key]:
                                                            prev[
                                                                section.key
                                                            ] === 'desc'
                                                                ? undefined
                                                                : 'desc',
                                                    }))
                                                }
                                            >
                                                <ButtonText>
                                                    {section.descTitle}
                                                </ButtonText>
                                            </Btn>
                                        </OptionsWrapper>
                                    </FeatureWrapper>
                                ))}
                            </Section>
                            <Section>
                                <TypoHeadSection>Фильтры</TypoHeadSection>
                                {Object.entries(data).map(
                                    ([filterKey, filterValues]) => (
                                        <FeatureWrapper>
                                            <TypoHeadFilter>
                                                {filterKey}
                                            </TypoHeadFilter>{' '}
                                            <OptionsWrapper>
                                                {filterValues!.map((option) => (
                                                    <Btn
                                                        $isActivated={
                                                            filters[
                                                                filterKey
                                                            ]?.find(
                                                                (o) =>
                                                                    o ===
                                                                    option,
                                                            ) !== undefined
                                                        }
                                                        onClick={() =>
                                                            setFilters(
                                                                (prev) => {
                                                                    const prevOptions =
                                                                        prev[
                                                                            filterKey
                                                                        ] ?? [];
                                                                    if (
                                                                        prevOptions.find(
                                                                            (
                                                                                o,
                                                                            ) =>
                                                                                o ===
                                                                                option,
                                                                        ) !==
                                                                        undefined
                                                                    )
                                                                        return {
                                                                            ...prev,
                                                                            [filterKey]:
                                                                                prevOptions.filter(
                                                                                    (
                                                                                        o,
                                                                                    ) =>
                                                                                        o !==
                                                                                        option,
                                                                                ),
                                                                        };
                                                                    return {
                                                                        ...prev,
                                                                        [filterKey]:
                                                                            prevOptions.concat(
                                                                                option,
                                                                            ),
                                                                    };
                                                                },
                                                            )
                                                        }
                                                    >
                                                        <ButtonText>
                                                            {option}
                                                        </ButtonText>
                                                    </Btn>
                                                ))}
                                            </OptionsWrapper>
                                        </FeatureWrapper>
                                    ),
                                )}
                            </Section>
                        </FiltersRow>
                    ) : (
                        <PageLoader size='14px' gap='4px' />
                    )}
                    <DialogRow>
                        <DialogSecondaryButton
                            onClick={() => {
                                setFilters({});
                                setSorting({});
                            }}
                        >
                            <ButtonText $size='l'>Сбросить все</ButtonText>
                        </DialogSecondaryButton>
                        <DialogSecondaryButton
                            onClick={() => {
                                const newFiltersValue = Object.fromEntries(
                                    Object.entries(filters).filter(
                                        ([_, value]) => value!.length !== 0,
                                    ),
                                );

                                setSearchParam(
                                    'filters',
                                    Object.entries(newFiltersValue).length === 0
                                        ? null
                                        : JSON.stringify(newFiltersValue),
                                );

                                const newSortingValue = Object.fromEntries(
                                    Object.entries(sorting).filter(
                                        ([_, value]) => value !== undefined,
                                    ),
                                ) as Record<string, 'asc' | 'desc'>;

                                setSearchParam(
                                    'sorting',
                                    Object.entries(newSortingValue).length === 0
                                        ? null
                                        : JSON.stringify(newSortingValue),
                                );

                                toggleAreShownProductFilters();
                            }}
                        >
                            <ButtonText $size='l'>Применить</ButtonText>
                        </DialogSecondaryButton>

                        <DialogOutlineButton
                            onClick={toggleAreShownProductFilters}
                        >
                            <ButtonText $size='l'>Закрыть</ButtonText>
                        </DialogOutlineButton>
                    </DialogRow>
                </DialogWrapper>
            }
            isOpen={areShownProductFilters}
            onClose={toggleAreShownProductFilters}
            title={'product filters'}
            description={'filters for products page'}
        />
    );
};

const TypoHeadFilter = styled.span`
    ${typography({
        fontSize: '0.8rem',
        lineHeight: '1.2rem',

        fontWeight: '600',
    })}
    color: ${({ theme }) => theme.dialog.foreground.text}
`;

const TypoHeadSection = styled.span`
    ${typography({
        fontSize: '1.3rem',
        lineHeight: '1.8rem',
        fontWeight: '700',
    })}
    color: ${({ theme }) => theme.dialog.foreground.text}
`;
