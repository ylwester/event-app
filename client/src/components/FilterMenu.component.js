// import React, {useEffect, useState} from "react";
// import {
//   Button,
//   Container,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   ListGroup,
//   ListGroupItem,
// } from "reactstrap";
// import "../styles/filterMenu.css";
// import { StringParam, useQueryParams } from "use-query-params";
// import {set} from "mongoose";
//
//
//
// const FilterMenuComponent = ({ result, setResult, eventsCategories }) => {
//     const [searchByCategory, setSearchByCategory] = useState('');
//
//     const [filters, setFilters] = useState({
//         category: '',
//         paid: null,
//         day: '',
//     })
//
//     function applyFilter(result, filter) {
//         const {category, isPaid, date} = filter;
//         let results = result;
//
//         if(category) {
//             results = results.filter(event => event.categories.some(cat => cat.id === category))
//         }
//         if(isPaid) {
//             results = results.filter(event => event.paid === isPaid)
//         }
//         console.log(results);
//         return results;
//     }
//
//
//   //   const [query, setQuery] = useQueryParams({
//   //   category: StringParam,
//   //   paid: StringParam,
//   //   day: StringParam,
//   // });
//   //
//   // useEffect(() => {
//   //   if (query.paid) document.getElementById("paid").checked = true;
//   //
//   //   if (query.day) document.getElementById("day").value = query.day;
//   // });
//
//   const handlePaid = () => {
//       setFilters({...filters, paid: true})
//     // if (query.paid !== undefined) {
//     //   setQuery({ paid: undefined });
//     // } else {
//     //   setQuery({ paid: "false" });
//     // }
//     // window.location.reload();
//   };
//
//   const handleCategory = (cat) => {
//       if(cat === filters.category){
//           setFilters({...filters, category: ''})
//           setResult(applyFilter(result, filters));
//           return;
//       }
//       setFilters({...filters, category: cat})
//       setResult(applyFilter(result, filters));
//
//     // if (query.category === category.id.toString()) {
//     //   setQuery({ category: undefined });
//     // } else {
//     //   setQuery({ category: category.id });
//     // }
//     // window.location.reload();
//   };
//   //
//   // const handleDate = (e) => {
//   //   if (query.day !== undefined && query.day === e.target.value) {
//   //     setQuery({ day: undefined });
//   //   } else {
//   //     setQuery({ day: e.target.value });
//   //   }
//   //   window.location.reload();
//   // };
//
//   return (
//       <Container>
//           <h5 className="p-1">Filtry</h5>
//           <h6 className="p-1 border-bottom">Kategorie</h6>
//           <ListGroup flush>
//               {eventsCategories.length !== 0
//                   ? eventsCategories.map((category) => (
//                       <ListGroupItem
//                           id={category.id}
//                           onClick={() => handleCategory(category.id)}
//                           key={category.id}
//                           // className={
//                           //     query.category === category.id.toString()
//                           //         ? "category active"
//                           //         : "category"
//                           // }
//                       >
//                           {category.name}
//                       </ListGroupItem>
//                   ))
//                   : null}
//           </ListGroup>
//           <h6 className="p-1 border-bottom">Płatność</h6>
//           <Form>
//               <FormGroup check>
//                   <Label style={{ padding: ".5rem 1rem" }} check for="paid">
//                       <Input
//                           id="paid"
//                           onChange={handlePaid}
//                           type="checkbox"
//                           name="paid"
//                       />
//                       {""}
//                       Darmowe
//                   </Label>
//               </FormGroup>
//               <h6 className="p-1 border-bottom">Data</h6>
//               <FormGroup style={{ marginTop: "10px" }}>
//                   {/*<input onChange={(e) => handleDate(e)} id="day" type="date" />*/}
//               </FormGroup>
//           </Form>
//       </Container>
//   );
// };
//
// export default FilterMenuComponent;

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