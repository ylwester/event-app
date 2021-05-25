import {useEffect, useState} from "react";

const FilterMenuComponent = ({ events, result, setResult, eventsCategories }) => {
    const [filterByCategory, setFilterByCategory] = useState('');
    const [filterByPaid, setFilterByPaid] = useState('')
    const [filterByDate, setFilterByDate] = useState('');

      useEffect(() => {
        if (filterByPaid) {
            document.getElementById("paid").checked = true;
        } else {
            document.getElementById("paid").checked = false;
        }
        if(!filterByCategory) {
            document.getElementById("category-filter").selectedIndex = 0;
        }
        if(!filterByDate) {
            document.getElementById("day").value = '';
        }


    // if (query.day) document.getElementById("day").value = query.day;
  });

    useEffect(()=> {
        const res = events.filter(event =>
            (!filterByCategory || event.categories.some(cat => cat.id.toString() === filterByCategory)) &&
            (!filterByPaid || event.paid.toString() === filterByPaid) &&
            (!filterByDate || event.day === filterByDate)

        );
        console.log(res);
        setResult(res);
    }, [filterByCategory, filterByPaid, filterByDate, events, setResult]);

    const handleCategory = e => {
        console.log(e.target.value);
        setFilterByCategory(e.target.value);
    }

    const handlePaid = () => {
        if(!filterByPaid){
            setFilterByPaid("false");
        }else {
            setFilterByPaid('');
        }
        console.log(filterByPaid);
    }

    const handleDate = e => {
        setFilterByDate(e.target.value);
    }
    const handleClearFilters = (e) => {
        e.preventDefault()
        setFilterByCategory('');
        setFilterByDate('');
        setFilterByPaid('');
    }

    return (
        <div>
            <form>
                <select id="category-filter" defaultValue={filterByCategory} onChange={handleCategory} >
                    <option value="">Wszystkie</option>
                {eventsCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
                </select>
                <input type="checkbox" id="paid" name="paid" onClick={handlePaid} />
                <label htmlFor="paid">Tylko darmowe</label>

                <input onChange={handleDate} id="day" type="date" />
                <input type="button" value="Wyczyść filtry" onClick={handleClearFilters} />
            </form>
        </div>
    )
}

export default FilterMenuComponent;