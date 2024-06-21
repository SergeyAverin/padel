import { IReport } from "@redux/types/Report";
import { baseApi } from "../baseApi";
import { IComment } from "@redux/types/Comment";
import { IStory } from "@redux/types/Story";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReports: builder.mutation<
      IReport,
      { report_type: string; current_id: string }
    >({
      query(report) {
        return {
          url: `/reports`,
          method: "POST",
          body: {
            report_type: report.report_type,
            current_id: report.current_id,
          },
        };
      },
      invalidatesTags: ["REPORT"],
    }),

    getReports: builder.query<Array<IReport>, string>({
      query() {
        return {
          url: `/reports`,
        };
      },

      providesTags: ["REPORT"],
    }),

    rejectReport: builder.mutation<IReport, string>({
      query(reportId) {
        return {
          url: `/reports/${reportId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["REPORT"],
    }),

    loadComment: builder.mutation<IComment, string>({
      query(commentId) {
        return {
          url: `/comment/${commentId}`,
        };
      },
    }),

    loadStory: builder.mutation<IStory, string>({
      query(storyId) {
        return {
          url: `/story/${storyId}`,
        };
      },
      invalidatesTags: ["REPORT"],
    }),

    acceptReport: builder.mutation<IReport, string>({
      query(reportId) {
        return {
          url: `/reports/${reportId}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["REPORT"],
    }),
  }),
});

export const {
  useCreateReportsMutation,
  useAcceptReportMutation,
  useGetReportsQuery,
  useRejectReportMutation,
  useLoadStoryMutation,
  useLoadCommentMutation,
} = reportApi;
