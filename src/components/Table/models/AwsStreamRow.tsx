import { Link } from "react-router-dom";

/** Utils */
import { AwsStream } from "../../../services/aws/spec";
import { timestampToDate } from "../../../utils/dates";

interface Props {
  stream?: AwsStream;
}

const AwsStreamsRow = ({ stream }: Props) => {
  return (
    <>
      {stream ? (
        <tr>
          <td>
            <Link to={`/aws/logs/?group=${stream.groupName}&stream=${stream.logStreamName}`}>
              {stream.logStreamName}
            </Link>
          </td>
          <td>{timestampToDate(stream.firstEventTimestamp)}</td>
          <td> {timestampToDate(stream.lastEventTimestamp)}</td>
        </tr>
      ) : null}
    </>
  );
};
export default AwsStreamsRow;