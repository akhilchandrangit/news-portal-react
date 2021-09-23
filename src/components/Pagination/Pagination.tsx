import { getPaginationItems } from '../../lib/utility';

interface Props {
  page: number;
  total: number;
  onClick: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  page,
  total,
  onClick,
}) => {
  return (
    <div className="btn-group">
      {getPaginationItems(page, total).map((item, index) => (
        <button
          onClick={() => onClick(item)}
          key={index}
          className={`btn ${item === page && 'btn-active'}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
