import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";

  // 1. Filter
  let filteredCabins;
  filterValue === "no-discount"
    ? (filteredCabins = cabins.filter((cabin) => !cabin.discount))
    : filterValue === "with-discount"
    ? (filteredCabins = cabins.filter((cabin) => cabin.discount > 0))
    : (filteredCabins = cabins);

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "name/asc";
  const [field, direction] = sortBy.split("/");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins =
    field === "name"
      ? filteredCabins.sort(
          (a, b) => a["name"].localeCompare(b["name"]) * modifier
        )
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
