package cn.bugstack.domain.activity.service.trial.thread;

import cn.bugstack.domain.activity.adapter.repository.IActivityRepository;
import cn.bugstack.domain.activity.model.valobj.SkuVO;

import java.util.concurrent.Callable;

/**
 * 查询商品信息任务
 */
public class QuerySkuFromDBThreadTask implements Callable<SkuVO> {
    // 商品id
    private final String goodsId;
    // 活动仓储
    private final IActivityRepository repository;

    public QuerySkuFromDBThreadTask(String goodsId, IActivityRepository repository) {
        this.goodsId = goodsId;
        this.repository = repository;
    }

    @Override
    public SkuVO call() throws Exception {
        return repository.querySkuByGoodsId(goodsId);
    }
}
