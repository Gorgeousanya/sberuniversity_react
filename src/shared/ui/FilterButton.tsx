import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

type FilterProps = {
  setFilter: any;
};


export function FilterButton({setFilter}: FilterProps) {
  return (
    <DropdownButton id="dropdown-basic-button" title="Фильтр">
      <Dropdown.Item onClick={()=>setFilter('all')} href="#/action-1">Все</Dropdown.Item>
      <Dropdown.Item onClick={()=>setFilter('completed')} href="#/action-2">Выполненные</Dropdown.Item>
      <Dropdown.Item onClick={()=>setFilter('incompleted')} href="#/action-3">В работе</Dropdown.Item>
    </DropdownButton>
  )
}