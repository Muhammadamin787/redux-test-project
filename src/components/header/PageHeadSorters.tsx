import { Button } from "antd";

type HeadSortersProps = {
     showSorters?: {
          idSorter?: boolean,
          userIdSorter?: boolean,
          favouritesSorter?: boolean,
     }
}

const PageHeadSorters = ({ showSorters }: HeadSortersProps) => {

     // Hooks
     // const [filters, setFilters] = useFilters();
     // const order = filters.sortBy.order === "asc" ? "desc" : "asc";

     const orderType = (property) => {
          return <b>=</b>
          // if (filters.sortBy.property === property) {
          //      return <b> {filters.sortBy.order.toUpperCase()}</b>;
          // }
     };

     const onSort = (property) => {
          // setFilters({
          //      ...filters,
          //      sortBy: { property, order },
          // });
     };

     const getDisplay = (sorterName: string) => {
          return {}
          // return { display: showSorters[sorterName] ? "block" : "none" };
     };

     return (
          <section className="head-sorters">
               <Button
                    size="small"
                    style={getDisplay("idSorter")}
                    onClick={() => onSort("id")}
               >
                    ID по {orderType("id")}
               </Button>
               <Button size="small"
                    style={getDisplay("userIdSorter")}
                    onClick={() => onSort("userId")}>
                    Пользователь по {orderType("userId")}
               </Button>
               <Button
                    size="small"
                    style={getDisplay("favouritesSorter")}
                    onClick={() => onSort("favourites")}
               >
                    Избранные по {orderType("favourites")}
               </Button>
               <Button size="small"
                    style={getDisplay("completedSorter")}
                    onClick={() => onSort("completed")}>
                    Выполненные {orderType("completed")}
               </Button>
          </section>
     );
};

export default PageHeadSorters;
