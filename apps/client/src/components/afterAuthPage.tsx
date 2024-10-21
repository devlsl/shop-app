import { useEffect } from 'react';
import {
    setIsShownSignInView,
    showSignInView,
    useIsShownSignInView,
} from '../hooks/useAppState';
import { useApi } from '../hooks/useApi';
import { useMountAnim } from '../hooks/useMountAnim';
import { DialogDemo } from '../uikit/dialog';
import { Button } from '../uikit/button';
import { Item, Test } from './test';
import { setUser, useUser } from '../modules/user';
import { toggleTheme } from '../modules/theme';

const items: Item[] = [
    {
        id: '1',
        name: 'Электроника',
        children: [
            {
                id: '1-1',
                name: 'Смартфоны',
                children: [
                    {
                        id: '1-1-1',
                        name: 'Android',
                        children: [
                            { id: '1-1-1-1', name: 'Samsung', children: [] },
                            { id: '1-1-1-2', name: 'Xiaomi', children: [] },
                            { id: '1-1-1-3', name: 'Huawei', children: [] },
                        ],
                    },
                    {
                        id: '1-1-2',
                        name: 'iOS',
                        children: [
                            { id: '1-1-2-1', name: 'iPhone 12', children: [] },
                            { id: '1-1-2-2', name: 'iPhone 13', children: [] },
                            { id: '1-1-2-3', name: 'iPhone 14', children: [] },
                        ],
                    },
                ],
            },
            {
                id: '1-2',
                name: 'Ноутбуки',
                children: [
                    {
                        id: '1-2-1',
                        name: 'Игровые',
                        children: [
                            { id: '1-2-1-1', name: 'ОЕМ', children: [] },
                            { id: '1-2-1-2', name: 'Asus', children: [] },
                            { id: '1-2-1-3', name: 'Acer', children: [] },
                        ],
                    },
                    {
                        id: '1-2-2',
                        name: 'Ультрабуки',
                        children: [
                            { id: '1-2-2-1', name: 'Dell XPS', children: [] },
                            {
                                id: '1-2-2-2',
                                name: 'MacBook Air',
                                children: [],
                            },
                            { id: '1-2-2-3', name: 'HP Spectre', children: [] },
                        ],
                    },
                ],
            },
            {
                id: '1-3',
                name: 'Аудио',
                children: [
                    {
                        id: '1-3-1',
                        name: 'Наушники',
                        children: [
                            {
                                id: '1-3-1-1',
                                name: 'Беспроводные',
                                children: [],
                            },
                            { id: '1-3-1-2', name: 'Проводные', children: [] },
                        ],
                    },
                    {
                        id: '1-3-2',
                        name: 'Колонки',
                        children: [
                            {
                                id: '1-3-2-1',
                                name: 'Портативные',
                                children: [],
                            },
                            { id: '1-3-2-2', name: 'Настольные', children: [] },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        name: 'Одежда',
        children: [
            {
                id: '2-1',
                name: 'Мужская',
                children: [
                    { id: '2-1-1', name: 'Футболки', children: [] },
                    { id: '2-1-2', name: 'Брюки', children: [] },
                    { id: '2-1-3', name: 'Рубашки', children: [] },
                ],
            },
            {
                id: '2-2',
                name: 'Женская',
                children: [
                    { id: '2-2-1', name: 'Платья', children: [] },
                    { id: '2-2-2', name: 'Юбки', children: [] },
                    { id: '2-2-3', name: 'Блузки', children: [] },
                ],
            },
            {
                id: '2-3',
                name: 'Детская',
                children: [
                    { id: '2-3-1', name: 'Футболки', children: [] },
                    { id: '2-3-2', name: 'Шорты', children: [] },
                    { id: '2-3-3', name: 'Платья', children: [] },
                ],
            },
        ],
    },
    {
        id: '3',
        name: 'Косметика',
        children: [
            {
                id: '3-1',
                name: 'Уход за кожей',
                children: [
                    { id: '3-1-1', name: 'Кремы', children: [] },
                    { id: '3-1-2', name: 'Сыворотки', children: [] },
                ],
            },
            {
                id: '3-2',
                name: 'Макияж',
                children: [
                    { id: '3-2-1', name: 'Помады', children: [] },
                    { id: '3-2-2', name: 'Тушь', children: [] },
                ],
            },
            {
                id: '3-3',
                name: 'Парфюмерия',
                children: [
                    { id: '3-3-1', name: 'Духи', children: [] },
                    { id: '3-3-2', name: 'Одеколоны', children: [] },
                ],
            },
        ],
    },
    {
        id: '4',
        name: 'Дом и сад',
        children: [
            {
                id: '4-1',
                name: 'Мебель',
                children: [
                    { id: '4-1-1', name: 'Кровати', children: [] },
                    { id: '4-1-2', name: 'Стулья', children: [] },
                    { id: '4-1-3', name: 'Столы', children: [] },
                ],
            },
            {
                id: '4-2',
                name: 'Декор',
                children: [
                    { id: '4-2-1', name: 'Картины', children: [] },
                    { id: '4-2-2', name: 'Занавески', children: [] },
                ],
            },
            {
                id: '4-3',
                name: 'Садовые инструменты',
                children: [
                    { id: '4-3-1', name: 'Лопаты', children: [] },
                    { id: '4-3-2', name: 'Секаторы', children: [] },
                ],
            },
        ],
    },
    {
        id: '5',
        name: 'Спорт и отдых',
        children: [
            {
                id: '5-1',
                name: 'Фитнес',
                children: [
                    { id: '5-1-1', name: 'Тренажеры', children: [] },
                    { id: '5-1-2', name: 'Экипировка', children: [] },
                ],
            },
            {
                id: '5-2',
                name: 'Альпинизм',
                children: [
                    { id: '5-2-1', name: 'Снаряжение', children: [] },
                    { id: '5-2-2', name: 'Одежда', children: [] },
                ],
            },
            {
                id: '5-3',
                name: 'Плавание',
                children: [
                    { id: '5-3-1', name: 'Купальники', children: [] },
                    { id: '5-3-2', name: 'Очки', children: [] },
                ],
            },
        ],
    },
];

export const AfterAuthPage = () => {
    const user = useUser();
    const isShownSignInView = useIsShownSignInView();

    const {
        call: signIn,
        status: signInStatus,
        data: signInData,
    } = useApi('signInByEmailAndPassword');
    const { call: signOut, status: signOutStatus } = useApi('signOut');

    useEffect(() => {
        if (signOutStatus === 'success') {
            setUser(null);
        }
    }, [signOutStatus]);

    useEffect(() => {
        if (signInStatus === 'success') {
            setUser(signInData);
        }
    }, [signInStatus]);

    const {
        mounted: isSignInDialogShowed,
        unmounting: isSignInDialogUnmounting,
        styles: signInDialogAnimStyles,
    } = useMountAnim(isShownSignInView, 200);

    if (user === undefined) {
        return null;
    }

    const isGuest = user === null;

    return (
        <div>
            {isGuest ? (
                <>
                    <Button
                        onClick={() => signIn({ email: '1', password: '1' })}
                    >
                        sign in
                    </Button>

                    <DialogDemo
                        mounted={isSignInDialogShowed}
                        unmounting={isSignInDialogUnmounting}
                        toggle={setIsShownSignInView}
                        animStyles={signInDialogAnimStyles}
                    />
                </>
            ) : (
                <Button onClick={() => signOut()}>sign out</Button>
            )}
            <div style={{ display: 'flex', gap: '20px' }}>
                <Button
                    onClick={isGuest ? showSignInView : () => alert('корзина')}
                >
                    карзина
                </Button>
                <Button
                    onClick={isGuest ? showSignInView : () => alert('заказы')}
                >
                    заказы
                </Button>
            </div>
            <br />
            <br />
            hello {isGuest ? 'guest' : user.role}
            <br />
            <br />
            <Button onClick={toggleTheme}>change theme</Button>
            <Button>sign in</Button>
            <Test items={items} />
        </div>
    );
};
