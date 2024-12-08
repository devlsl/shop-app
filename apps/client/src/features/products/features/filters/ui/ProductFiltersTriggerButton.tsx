import { FilterIcon } from 'lucide-react';
import { useNavigationParam } from '../../../../navigation';
import { toggleAreShownProductFilters } from '../actions';
import { IconButton } from '../../../../../shared/ui/IconButton';
import { Tooltip } from '../../../../../shared/ui/Tooltip';

export const ProductFiltersTriggerButton = () => {
    const page = useNavigationParam('page') ?? '';
    return page === 'products' || page === 'favorites' ? (
        <Tooltip content='Фильтры товаров'>
            <IconButton onClick={toggleAreShownProductFilters}>
                <FilterIcon />
            </IconButton>
        </Tooltip>
    ) : null;
};
