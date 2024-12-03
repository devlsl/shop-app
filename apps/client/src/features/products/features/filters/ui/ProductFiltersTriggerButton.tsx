import { FilterIcon } from 'lucide-react';
import { IconButton } from '../../../../../ui/buttons/iconButton';
import { useUrlParam } from '../../../../url';
import { toggleAreShownProductFilters } from '../actions';

export const ProductFiltersTriggerButton = () => {
    const page = useUrlParam('page') ?? '';
    return page === 'products' || page === 'favorites' ? (
        <IconButton onClick={toggleAreShownProductFilters}>
            <FilterIcon />
        </IconButton>
    ) : null;
};
