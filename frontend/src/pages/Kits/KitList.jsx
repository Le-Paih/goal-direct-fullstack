import KitCard from "./KitCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../../utils/constants";
import { useContext } from "react";
import { GridDivKit, MainDivKit } from "./KitListStyle";
import { DataContext } from "../../context/dataContext";
import FullscreenSpinner from "../../ui/Spinner";

function KitList() {
  const [searchParams] = useSearchParams();
  const { kitData, loading } = useContext(DataContext);

  if (!kitData) {
    return null;
  }

  if (loading) {
    return <FullscreenSpinner />;
  }

  if (!Array.isArray(kitData) || kitData.length === 0) {
    return <p>No kits available.</p>;
  }

  if (!kitData) {
    return null;
  }

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const lastPostIndex = currentPage * PAGE_SIZE;
  const firstPostIndex = lastPostIndex - PAGE_SIZE;

  return (
    <MainDivKit>
      <GridDivKit>
        {Array.isArray(kitData) && kitData.length > 0 ? (
          kitData
            .slice(firstPostIndex, lastPostIndex)
            .map((kit) => (
              <KitCard
                key={kit._id}
                id={kit._id}
                image={kit.image.image1}
                name={kit.name}
                price={kit.price}
              />
            ))
        ) : (
          <p>No kits available.</p>
        )}
      </GridDivKit>
      <Pagination count={kitData.length} />
    </MainDivKit>
  );
}

export default KitList;
