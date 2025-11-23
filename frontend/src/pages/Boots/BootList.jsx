import BootCard from "./BootCard";
import { useSearchParams } from "react-router-dom";
import { GridDiv } from "../../styles/GridStyle";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../../utils/constants";

import { useContext } from "react";
import { MainDivList } from "./BootListStyle";
import { DataContext } from "../../context/dataContext";
import FullscreenSpinner from "../../ui/Spinner";

function BootList() {
  const [searchParams] = useSearchParams();
  const { bootData, loading } = useContext(DataContext);

  if (loading) {
    return <FullscreenSpinner />;
  }

  if (!Array.isArray(bootData) || bootData.length === 0) {
    return <p>No boots available.</p>;
  }

  if (!bootData) {
    return null;
  }

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const lastPostIndex = currentPage * PAGE_SIZE;
  const firstPostIndex = lastPostIndex - PAGE_SIZE;

  return (
    <MainDivList>
      <GridDiv>
        {Array.isArray(bootData) && bootData.length > 0 ? (
          bootData
            .slice(firstPostIndex, lastPostIndex)
            .map((boot) => (
              <BootCard
                key={boot._id}
                id={boot._id}
                image={boot.image.image1}
                name={boot.name}
                price={boot.price}
              />
            ))
        ) : (
          <p>No boots available.</p>
        )}
      </GridDiv>
      <Pagination count={bootData.length} />
    </MainDivList>
  );
}

export default BootList;
