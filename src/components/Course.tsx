import { Box, Tab, Tabs, Typography, Grid, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import moment from "moment/moment";

// assets
import StarIcon from "@mui/icons-material/Star";

// components
import CoursePreview from "./CoursePreview";

export default function Course(props: any) {
  const { source = {}, onClick = () => {} } = props;

  const [state, setState] = useState({
    preview: null,
  });

  return (
    <Box
      className="d-flex flex-column h-100"
      onMouseEnter={() =>
        setState((prev) => ({ ...prev, preview: source?.id }))
      }
      onMouseLeave={() => setState((prev) => ({ ...prev, preview: null }))}
      onClick={onClick}
      sx={{
        position: "relative",
        border: "1px solid #eee",
        borderRadius: "5px",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <img
        src={source?.image_750x422}
        alt={source?.headline}
        style={{
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <Box className="flex-grow-1 d-flex flex-column" padding={2}>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "bold",
            lineHeight: 1.3,
          }}
        >
          {source?.title}
        </Typography>

        <Typography
          sx={{
            color: "grey",
            fontSize: "15px",
            lineHeight: 1.3,
            marginTop: 1,
          }}
        >
          {source?.visible_instructors
            ?.map((user: any) => user?.display_name)
            .join(", ")}
        </Typography>

        <Box className="d-flex align-items-baseline" marginTop={0.5}>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "bold",
              marginRight: 0.5,
            }}
          >
            {Number(source?.rating).toLocaleString(undefined, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
          </Typography>

          <Box>
            {Array.from({ length: 5 }, () => (
              <StarIcon sx={{ color: "gold", fontSize: "15px" }} />
            ))}
          </Box>

          <Typography sx={{ fontSize: "12px", marginLeft: 0.5 }}>
            ({Number(source?.num_reviews).toLocaleString()})
          </Typography>
        </Box>

        <Box className="d-flex align-items-center" marginY={1}>
          {source?.discount_price === null ? (
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              {source?.price === "Free"
                ? "Free"
                : `PHP ${Number(source?.price).toLocaleString()}`}
            </Typography>
          ) : (
            <>
              <Typography>
                {Number(source?.discount_price).toLocaleString()}
              </Typography>

              <Typography>{Number(source?.price).toLocaleString()}</Typography>
            </>
          )}
        </Box>

        <Box
          className="d-flex align-items-center justify-content-end"
          sx={{
            // borderTop: "1px solid #eee",
            marginTop: "auto",
            paddingTop: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#00AAFF",
              color: "#FFFFFF",
              fontSize: "12px",
              padding: "2px 10px",
            }}
          >
            {source?.primary_category?.title}
          </Box>

          <Box
            sx={{
              backgroundColor: "#FBBC04",
              color: "#FFFFFF",
              fontSize: "12px",
              padding: "2px 10px",
              marginLeft: 1,
            }}
          >
            {source?.primary_subcategory?.title}
          </Box>
        </Box>
      </Box>

      <CoursePreview show={state.preview === source?.id} source={source} />
    </Box>
  );
}
