import { Button, ButtonVariant } from "@atoms/index";
import UserPhoto from "@molecules/user/UserPhoto";
import {
  useAcceptJoinRequsetMutation,
  useDeleteJoinRequestMutation,
} from "@redux/api/joinRequestApi";
import { IJoinRequest } from "@schemas/joinRequest";
import React from "react";

interface IJoinRequstProps {
  joinRequst: IJoinRequest;
}

export const JoinRequst: React.FC<IJoinRequstProps> = ({ joinRequst }) => {
  const [deleteJoinRequest] = useDeleteJoinRequestMutation();
  const [acceptRequest] = useAcceptJoinRequsetMutation();
  return (
    <div className="bg-bg p-3 rounded-2xl mt-5">
      <div>
        <div className="flex bg-bg p-3 rounded-2xl mt-5 items-center">
          <div className="w-[72px] h-[72px]">
            <UserPhoto
              avatar={joinRequst.join_request_user.avatar}
              lvl={joinRequst.join_request_user.lvl}
            />
          </div>
          <div>
            <div className="text-[24px] ml-3">
              {joinRequst.join_request_user.username}
            </div>
            <div className="text-[14px] ml-3">
              {joinRequst.join_request_user.first_name}
            </div>
            <div className="text-[14px] ml-3">
              {joinRequst.join_request_user.last_name.toLowerCase() != "none" &&
                joinRequst.join_request_user.last_name}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3">Position number: {joinRequst.index}</div>
      <div className="flex">
        <div className="w-[100px]">
          <Button
            variant={ButtonVariant.FULL_HIGHLIGHT}
            onClick={() =>
              acceptRequest({
                joinRequestId: joinRequst.id,
                matchId: joinRequst.join_request_match.id,
              })
            }
          >
            Accept
          </Button>
        </div>
        <div className="w-[100px] ml-1">
          <Button
            variant={ButtonVariant.OUTLINED}
            onClick={() => deleteJoinRequest(joinRequst.id)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
