import { FilterIcon } from 'lucide-react';
import { useNavigationParam } from '../../../../navigation';
import { toggleAreShownProductFilters } from '../actions';
import { IconButton } from '../../../../../shared/ui/IconButton';

export const ProductFiltersTriggerButton = () => {
    const page = useNavigationParam('page') ?? '';
    return page === 'products' || page === 'favorites' ? (
        <IconButton onClick={toggleAreShownProductFilters}>
            <FilterIcon />
        </IconButton>
    ) : null;
};
