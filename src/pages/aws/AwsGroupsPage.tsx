import { useState } from "react";
import AlertError from "../../components/alerts/AlertError";
import BackButton from "../../components/Buttons/BackButton";
import SearchBar from "../../components/SearchBar/SearchBarv2";
import Spinner from "../../components/Spinner/Spinner";
import AwsGroupsRow from "../../components/table/models/AwsGroupRow";
import Table from "../../components/table/Table";
import { CloudWatch } from "../../services/aws/aws";
import { AwsLogGroup } from "../../services/aws/spec";
import { useCloudWatch } from "../../utils/hooks";

const AwsGroupsPage = () => {
  const { data: groups, loading, error } = useCloudWatch<AwsLogGroup>(CloudWatch.groups())
  const [filterQuery, setFilterQuery] = useState<string>("")

  const filterByGroupName = (groupName: string) => {
    return groups.filter(group => group.logGroupName.includes(groupName));
  }

  if (error)
    return <AlertError />

  if (loading)
    return <Spinner />

  return (
    <>
      <div className="d-flex justify-content-between pt-4 pb-4">
        <BackButton />
        <SearchBar placeHolder="Search" setFilterQuery={setFilterQuery} />
      </div>
      <>
        <Table
          headers={["Log group", "Creation time"]}
          itemComponent={AwsGroupsRow}
          items={filterByGroupName(filterQuery)}
          resourceName="group"
        />
      </>
    </>
  );
};

export default AwsGroupsPage;