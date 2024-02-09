import type { PageComponent } from '@nxweb/react';

import { useNavigate } from 'react-router-dom';

const DANABind: PageComponent = () => {
  const navigate = useNavigate();
  const url = 'https://m.sandbox.dana.id/m/portal/oauth?clientId=2022021611522186783288&scopes=QUERY_BALANCE,DEFAULT_BASIC_PROFILE,AGREEMENT_PAY,MINI_DANA&requestId=180fa418-f4fd-45ae-9e99-8deb07c2059d&state=2345555&terminalType=APP&lang=id&redirectUrl=https://www.tokrum.com/oauthdana/callback&seamlessData=%7B%22mobile%22%3A%2208579512345688%22%2C%22verifiedTime%22%3A%222024-02-07T03%3A56%3A46%2B00%3A00%22%2C%22externalUid%22%3A%22customerId%22%2C%22reqTime%22%3A%222024-02-07T03%3A56%3A46%2B00%3A00%22%2C%22reqMsgId%22%3A%22180fa418-f4fd-45ae-9e99-8deb07c2059d%22%7D&seamlessSign=GGB2gUKtCktDY2%2BmFZ6X4jwQTGCCm5TwClCRRuTEryKuxan5xSmHQ7dT1H7811GbAP2mIfGrNo7Z75a%2BkCN7v8UNYMG7E3PMrrEDv78tevTwny5cFI3PyrZMDGZGed3rVUrw9ZIehp%2FuEvC%2B74YToj9a8%2BGLu3cZ07mSl3HTPfaNptemDYZ8iSwV2tCIGMzsjNe09Pq0oWf2laI7GFOJz8bXx3jonpVxwIumYDiiS3zosnorRQd%2F3wED%2FdVK56Ub2EwmpszVIoHQHaKQ4nq1O6neRJQwTGP3iUsXWtnkKpDDsGvTe7e%2F5xsasAo7fP706qIGUs1uceMWAbow9AhUsQ%3D%3D';

  navigate(url);

  return (
    // <iframe height="100%" src="https://tokrum.com" title="dana" width="100%" />
    <div>empty</div>
  );
};

DANABind.displayName = 'DANABind';
DANABind.layout = 'appbar';
DANABind.meta = { appBarId: 'DANA Binding', description: 'zzz' };

export default DANABind;
