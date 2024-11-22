import { AuthContext } from 'ts-api-generator';
import { StorageService } from '../../types';

type Props = {
    staticServerHostname: string;
    storage: StorageService;
    productId: string;
    context?: AuthContext;
};

export const getProductPageItem = async ({
    storage,
    productId,
    staticServerHostname,
    context,
}: Props) => {
    const product = (await storage.product.get()).find(
        (p) => p.id === productId,
    );

    if (product === undefined) return undefined;

    const isLiked =
        context !== undefined
            ? (await storage.favoriteItem.get()).find(
                  (i) => i.userId === context.id && i.productId === productId,
              ) === undefined
                ? false
                : true
            : false;

    return {
        id: product.id,
        media: product.media
            .filter((m) => m.type === 'image')
            .map((m) => ({
                url: `${staticServerHostname}/${m.sizes.main}`,
            })),
        leftInStock: product.leftInStock,
        name: product.name,
        price: product.price,
        isLiked,
    };
};
