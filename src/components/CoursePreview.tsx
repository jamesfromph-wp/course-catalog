import { Box, Typography } from "@mui/material";
import moment from "moment/moment";

// assets
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export default function CoursePreview(props: any) {
  const { show = false, source = {} } = props;

  return (
    <Box
      className="d-flex flex-column bg-white w-100 h-100"
      sx={{
        position: "absolute",
        top: show ? "0%" : "100%",
        left: 0,
        padding: 4,
        transition: "top 300ms ease-in-out",
      }}
    >
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          lineHeight: 1.3,
        }}
      >
        {source?.title}
      </Typography>

      <Box className="d-flex align-items-center" marginTop={1.5}>
        <Typography sx={{ color: "green", fontSize: "12px" }}>
          Updated
        </Typography>

        <Typography
          sx={{
            color: "green",
            fontSize: "12px",
            fontWeight: "bold",
            marginLeft: 0.5,
          }}
        >
          {moment(source?.last_update_date).format("MMMM YYYY")}
        </Typography>
      </Box>

      <Box className="d-flex align-items-baseline" marginTop={1}>
        <Typography
          sx={{
            color: "grey",
            fontSize: "12px",
            marginRight: 0.5,
          }}
        >
          {source?.content_info}
        </Typography>
        •
        <Typography
          sx={{
            color: "grey",
            fontSize: "12px",
            marginX: 0.5,
          }}
        >
          {source?.instructional_level}
        </Typography>
        •
        <Typography
          sx={{
            color: "grey",
            fontSize: "12px",
            marginLeft: 0.5,
          }}
        >
          Subtitle
        </Typography>
      </Box>

      <Typography sx={{ marginTop: 1.5 }}>{source?.headline}</Typography>

      <Box
        className="d-flex flex-column"
        sx={{ marginTop: 2, overflowY: "auto" }}
      >
        {source?.what_you_will_learn_data?.items
          ?.filter((data: any, dataIndex: number) => dataIndex < 3)
          .map((data: any) => (
            <Box className="d-flex align-items-start" marginTop={1.5}>
              <CheckOutlinedIcon
                sx={{
                  color: "green",
                  fontSize: "20px",
                  marginRight: 1.5,
                }}
              />

              <Typography sx={{ fontSize: "13px" }}>{data}</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
