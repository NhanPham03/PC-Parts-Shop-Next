export default function Product({ params }: { params: {
  id: string,
} }) {
  return (
    <p>{params.id}</p>
  );
}