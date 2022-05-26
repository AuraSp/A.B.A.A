import React, { useState, useEffect } from 'react'
import ListLog from './ListLog';
import ReactPaginate from "react-paginate";
// import { updateLogs } from '../../../api/lib/LogsAPI';

function EventLogTable({ setAll, all, load, setRender, setCatFilter }) {

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
            <div className='w-25 d-flex flex-flow align-items-center'>
                <select defaultValue={""} onChange={(e) => { setCatFilter(e.target.value) }} className='btn border-1 border-secondary text-light historyPageSelectOption'>
                    <option value={""}>Rodyti visus veiksmus</option>
                    <option value={"Pridėjo"}>Rodyti tik pridėjimus</option>
                    <option value={"Ištrynė"}>Rodyti tik pašalinimus</option>
                    <option value={"Atnaujino"}>Rodyti tik atnaujinimus</option>
                    <option value={"Atsiunte"}>Rodyti tik atsisiuntimus</option>
                </select>
                <input type="select" className='p-1 ms-4' />
            </div>
            <table className='table table-borderless mx-auto adminlogtable'>
                <thead className='thead text-center text-light'>
                    <tr>
                        <th>Vartotojo ID</th>
                        <th>Atliktas veiksmas</th>
                        <th>Atlikto veiksmo data</th>
                    </tr>
                </thead>
                <tbody className='text-center text-light'>
                    {all.slice(
                        numberOfDataVistited,
                        numberOfDataVistited + dataPerPage
                    ).map((data) => (
                        <ListLog
                            userId={data.userId}
                            text={data.text}
                            createdAt={data.createdAt}
                        />
                    ))}
                </tbody>
            </table>
            {!load &&
                <div className='m-0 mb-4'>
                    <ReactPaginate
                        previousLabel={"Atgal"}
                        nextLabel={"Pirmyn"}
                        pageCount={totalPages}
                        onPageChange={changePage}
                        containerClassName={"navigationButtons"}
                        disabledClassName={"navigationDisabled"}
                        activeClassName={"navigationActive"}
                    />
                </div>
            }
        </>
    )
}

export default EventLogTable