import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
} from "reactstrap";
import "../styles/filterMenu.css";
import {StringParam, useQueryParams} from "use-query-params";
import {useEffect} from "react";


const FilterMenuComponent = ({events, eventsCategories}) => {
    const [query, setQuery] = useQueryParams({
        category: StringParam,
        paid: StringParam,
        date: StringParam,
    });

    useEffect(() => {
        if(query.paid)
        document.getElementById("paid").checked = true;
    })


    const handlePaid = () => {
        if(query.paid !== undefined){
            setQuery({paid: undefined});
        } else {
            setQuery({paid: "false"});
        }
        window.location.reload();
    }

    const handleCategory = (category) => {
        if(query.category === category.id.toString()){
            setQuery({category: undefined});
        } else {
            setQuery({category: category.id});
        }
    }

  return (
      <Container>
        <h5 className="p-1">Filtry</h5>
        <h6 className="p-1 border-bottom">Kategorie</h6>
        <ListGroup flush>
            {
                eventsCategories.length !== 0 ?
                    eventsCategories.map(category =>
                        <ListGroupItem id={category.id} onClick={() => handleCategory(category)} key={category.id} className={query.category === category.id.toString() ? 'category active' : "category" } >{category.name}</ListGroupItem>) : null
            }
        </ListGroup>
        <h6 className="p-1 border-bottom">Płatność</h6>
        <Form>
            <FormGroup check>
                <Label style={{padding: ".5rem 1rem"}} check for="paid">
                <Input id="paid" onChange={handlePaid} type="checkbox" name="paid" />{''}
                    Darmowe
                </Label>
            </FormGroup>
            <h6 className="p-1 border-bottom">Data</h6>
            <FormGroup style={{marginTop: "10px"}}>
                <input type="date"/>
            </FormGroup>
        </Form>
          <Button>
              Filtruj
          </Button>
      </Container>


      // <div className="container">
      //       <div className="row">
      //         <aside className="col-sm-4">
      //           <p>Filter 1</p>
      //
      //
      //           <div className="card">
      //             <article className="card-group-item">
      //               <header className="card-header">
      //                 <h6 className="title">Brands </h6>
      //               </header>
      //               <div className="filter-content">
      //                 <div className="card-body">
      //                   <form>
      //                     <label className="form-check">
      //                       <input className="form-check-input" type="checkbox" value=""/>
		// 		  <span className="form-check-label">
		// 		    Mersedes Benz
		// 		  </span>
      //                     </label>
      //                     <label className="form-check">
      //                       <input className="form-check-input" type="checkbox" value=""/>
		// 		  <span className="form-check-label">
		// 		    Nissan Altima
		// 		  </span>
      //                     </label>
      //                     <label className="form-check">
      //                       <input className="form-check-input" type="checkbox" value=""/>
		// 		  <span className="form-check-label">
		// 		    Another Brand
		// 		  </span>
      //                     </label>
      //                   </form>
      //
      //                 </div>
      //               </div>
      //             </article>
      //
      //             <article className="card-group-item">
      //               <header className="card-header">
      //                 <h6 className="title">Choose type </h6>
      //               </header>
      //               <div className="filter-content">
      //                 <div className="card-body">
      //                   <label className="form-check">
      //                     <input className="form-check-input" type="radio" name="exampleRadio" value=""/>
		// 	  <span className="form-check-label">
		// 	    First hand items
		// 	  </span>
      //                   </label>
      //                   <label className="form-check">
      //                     <input className="form-check-input" type="radio" name="exampleRadio" value=""/>
		// 	  <span className="form-check-label">
		// 	    Brand new items
		// 	  </span>
      //                   </label>
      //                   <label className="form-check">
      //                     <input className="form-check-input" type="radio" name="exampleRadio" value=""/>
		// 	  <span className="form-check-label">
		// 	    Some other option
		// 	  </span>
      //                   </label>
      //                 </div>
      //               </div>
      //             </article>
      //           </div>
      //
      //
      //         </aside>
      //         <aside className="col-sm-4">
      //           <p>Filter 2</p>
      //
      //
      //           <div className="card">
      //             <article className="card-group-item">
      //               <header className="card-header"><h6 className="title">Similar category </h6></header>
      //               <div className="filter-content">
      //                 <div className="list-group list-group-flush">
      //                   <a href="#" className="list-group-item">Cras justo odio <span
      //                       className="float-right badge badge-light round">142</span> </a>
      //                   <a href="#" className="list-group-item">Dapibus ac facilisis <span
      //                       className="float-right badge badge-light round">3</span> </a>
      //                   <a href="#" className="list-group-item">Morbi leo risus <span
      //                       className="float-right badge badge-light round">32</span> </a>
      //                   <a href="#" className="list-group-item">Another item <span
      //                       className="float-right badge badge-light round">12</span> </a>
      //                 </div>
      //               </div>
      //             </article>
      //             <article className="card-group-item">
      //               <header className="card-header"><h6 className="title">Color check</h6></header>
      //               <div className="filter-content">
      //                 <div className="card-body">
      //                   <label className="btn btn-danger">
      //                     <input className="" type="checkbox" name="myradio" value=""/>
      //                       <span className="form-check-label">Red</span>
      //                   </label>
      //                   <label className="btn btn-success">
      //                     <input className="" type="checkbox" name="myradio" value=""/>
      //                       <span className="form-check-label">Green</span>
      //                   </label>
      //                   <label className="btn btn-primary">
      //                     <input className="" type="checkbox" name="myradio" value=""/>
      //                       <span className="form-check-label">Blue</span>
      //                   </label>
      //                 </div>
      //               </div>
      //             </article>
      //           </div>
      //
      //
      //         </aside>
      //         <aside className="col-sm-4">
      //           <p>Filter 3</p>
      //
      //         </aside>
      //       </div>
      // </div>
);
};

export default FilterMenuComponent;
