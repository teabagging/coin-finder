import React from "react";
import CoinDetail from "../../components/coin-detail";
import { fetchAllCoins, getCoinById } from "../../lib/helper-functions/coin-data";
import Loading from "./loading";

export default function CoinDetailPage(props) {
  // 检查 selectedCoin 是否存在
  if (!props.selectedCoin) {
    return <div>Loading or Coin not found...</div>; // 或者其他合适的 fallback UI
  }
  return (
    <div className="text-white">
      <CoinDetail details={props.selectedCoin} />
    </div>
  );
}

export async function getStaticProps(context) {
  const coinId = context.params.coinId;
  const coin = await getCoinById(coinId);
  if (!coin) {
    // 如果 coin 不存在，返回一个错误页面或重定向
    return {
      notFound: true, // 这将导致 404 页面
    };
  }
  return {
    props: {
      selectedCoin: coin,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const coins = await fetchAllCoins();
  const paths = coins.map((coin) => ({ params: { coinId: coin.id.toString() } })); // 确保 coinId 是字符串
  return {
    paths: paths,
    fallback: true, // 根据你的需求调整
  };
}
