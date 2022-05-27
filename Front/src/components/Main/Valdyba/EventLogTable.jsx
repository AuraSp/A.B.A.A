import React, { useState } from 'react'
import ListLog from './ListLog';
import ReactPaginate from "react-paginate";

function EventLogTable({ all, data, user, load, setCatFilter, setUserFilterState }) {

    const [page, setPage] = useState(0);
    const dataPerPage = 10;
    const numberOfDataVistited = page * dataPerPage;
    const totalPages = Math.ceil(all.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPage(selected);
    };

    function sortByDate(a, b) {

        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
    }
    all.sort(sortByDate);

    return (
        <>
            <div className='w-100 d-flex flex-flow justify-content-center align-items-center pb-5'>
                {!load && <select
                    defaultValue=''
                    onChange={(e) => setUserFilterState(e.target.value)}
                    className='btn border-1 border-secondary text-light bg-dark me-5'>
                    <option className='text-light' value={""}>--Rodyti visus vartotojus--</option>
                    {user.map((data) => {
                        return <option className='text-light' key={data._id} value={data._id}>{data.username}</option>
                    })}
                </select>}
                <select defaultValue={""} onChange={(e) => { setCatFilter(e.target.value) }} className='btn border-1 border-secondary text-light bg-dark'>
                    <option value={""}>Rodyti visus veiksmus</option>
                    <option value={"Pridėjo"}>Rodyti tik pridėjimus</option>
                    <option value={"Ištrynė"}>Rodyti tik pašalinimus</option>
                    <option value={"Atnaujino"}>Rodyti tik atnaujinimus</option>
                    <option value={"Atsiunte"}>Rodyti tik atsisiuntimus</option>
                </select>
            </div>

            <table className='table table-borderless mx-auto adminlogtable'>
                <thead className='thead text-center text-light'>
                    <tr>
                        <th>vartotojo ID</th>
                        <th>Slapyvardis</th>
                        <th>El paštas</th>
                        <th>Rolė</th>
                        <th>Veiksmas</th>
                        <th>Suma</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody className='text-center text-light'>
                    {data.slice(numberOfDataVistited,
                        numberOfDataVistited + dataPerPage
                    ).map((data) => (
                        <React.Fragment key={data._id}>

                            <ListLog
                                key={data._id}
                                createdAt={data.createdAt}
                                datas={data}
                                user={user}
                            />
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {!load &&
                <div className='m-0 mb-3 mt-4'>
                    <ReactPaginate
                        previousLabel={"Atgal"}
                        nextLabel={"Pirmyn"}
                        pageCount={totalPages}
                        onPageChange={changePage}
                        containerClassName={"navigationButtons"}
                        disabledClassName={"navigationDisabled"}
                        activeClassName={"bg-warning fw-bold"}
                    />
                </div>
            }
        </>
    );
}
export default EventLogTable