import { useState } from "react";

/** Cloud Services */
import { CloudWatch } from "services/aws/aws";
import { IAwsStreams } from "services/aws/spec";

/** Components  */
import BackButton from "components/Buttons/BackButton";
import SearchBar from "components/SearchBar/SearchBar";
import Pagination from "components/Pagination/Pagination";
import AlertError from "components/Alert/AlertError";
import Spinner from "components/Spinner/Spinner";
import Table from "components/Table/Table";
import AwsStreamsRow from "components/Table/AwsTableRows/AwsStreamsRow";

/** Utils */
import { useCloudWatch, useQuery } from "utils/hooks";
import { getNumberOfPages, sliceArray } from "utils/arrays";

const AwsStreams = () => {
  const page = Number(useQuery().get("page") || "1");
  const groupName = useQuery().get("group") || "";
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [filterQuery, setFilterQuery] = useState<string>("");

  const {
    data: streams,
    loading,
    error
  } = useCloudWatch<IAwsStreams>(CloudWatch.streams([groupName]));

  streams.forEach(stream => (stream.groupName = groupName));

  if (error) return <AlertError />;

  if (loading) return <Spinner />;

  const filterByStreamName = (streamName: string) => {
    const result = streams.filter(stream => stream.logStreamName.includes(streamName));
    return sliceArray(result, currentPage);
  };

  return (
    <>
      <div className="d-flex justify-content-between pt-4 pb-4">
        <BackButton />
        <SearchBar placeHolder="Search" setFilterQuery={setFilterQuery} />
      </div>
      <Table
        headers={["Log stream", "First event time", "Last event time"]}
        itemComponent={AwsStreamsRow}
        items={filterByStreamName(filterQuery)}
        resourceName="stream"
      />
      <Pagination
        currentPage={currentPage}
        totalPages={getNumberOfPages(streams)}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};

export default AwsStreams;
