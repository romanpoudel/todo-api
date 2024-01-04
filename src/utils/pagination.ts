import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination";

export const buildMeta = (total: number, size?: number, page?: number) => {
  return {
    page: page || DEFAULT_PAGE,
    size: size || DEFAULT_PAGE_SIZE,
    total: Number(total),
  };
};

export const getPaginationOptions = (option: {
  page?: number;
  size?: number;
}) => {
  let { page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE } = option;
    // Ensure page and size are valid integers
    page = Number.isInteger(page) ? page : DEFAULT_PAGE;
    size = Number.isInteger(size) ? size : DEFAULT_PAGE_SIZE;

  const offset = (page - 1) * size;

  return {
    limit: size,
    offset,
  };
};