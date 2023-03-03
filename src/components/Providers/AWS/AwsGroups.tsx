/** Cloud Services */
import { CloudWatch } from "../../../services/aws/aws";

/** Components  */
import BackButton from "../../Buttons/BackButton";
import Spinner from "../../Spinner/Spinner";
import AlertError from "../../Alert/AlertError";
import Table from "../../Table/Table";
import AwsGroupsRow from "../../Table/AwsTableRows/AwsGroupsRow";

/** Utils */
import { useCloudWatch } from "../../../utils/hooks";
import SearchBar from "../../SearchBar/SearchBarv2";
import { IAwsLogGroups } from "../../../services/aws/spec";
import { useState } from "react";

const AwsGroups = () => {
  const { data: groups, loading, error } = useCloudWatch<IAwsLogGroups>(CloudWatch.groups())
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

export default AwsGroups;
