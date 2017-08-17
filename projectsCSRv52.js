// anonymous self-executing function to setup JSLink templates on page load..
(function () {
    var projectsview = projectsview || {};
    projectsview.Item = {
        customItemHtml: function (ctx) {
			var itemDisplayUrl = ctx.displayFormUrl + '&ID=' + ctx.CurrentItem.ID;
			var projectsviewItemHtml = "";
			projectsviewItemHtml += '<div class="News-Item">';
			//var onclickString = "openPageDialogwUrlnTitle( this.attributes['dialoghref'].value, this.title );return false;";
			if ( ctx.CurrentItem.AnnouncePhoto != '' )
			{
				projectsviewItemHtml += '<div class="newsphoto">\
					<a href="'+itemDisplayUrl+'" dialoghref="' + itemDisplayUrl + '" title="' + ctx.CurrentItem.Title + '" onclick="openNewWindow(this.href); return false;" class="newsTitle">\
						<img class="NewsLogo" width="180" height="135" src="' + ctx.CurrentItem.AnnouncePhoto + '" alt="' + ctx.CurrentItem['AnnouncePhoto.desc']+'"/>\
					</a>\
				</div>';
			}
			projectsviewItemHtml += '<table>\
					<tbody>\
						<tr>\
							<td class="td-newstitle">\
								<a href="'+itemDisplayUrl+'" dialoghref="' + itemDisplayUrl + '" title="' + ctx.CurrentItem.Title + '" onclick="openNewWindow(this.href); return false;" class="newsTitle">' + ctx.CurrentItem.Title + '</a><br />\
								<span class="newsDate">' + ctx.CurrentItem.PublishedDate + '</span>\
							</td>\
						</tr>\
						<tr>\
							<td valign="top" class="td-newscontent">\
								<div class="newscontent">\
									' + ctx.CurrentItem.Announce + '\
									<br class="continue-br" />\
									<a href="#" dialoghref="' + itemDisplayUrl + '" title="' + ctx.CurrentItem.Title + '" onclick="openNewWindow(this.href); return false;">Читать далее ...</a><br /><br />\
								</div>\
								<div class="newscontent">\
									' + ctx.CurrentItem.Region + '\
									<br class="continue-br" />\
								</div>\
							</td>\
						</tr>\
					</tbody>\
				</table>'
            return projectsviewItemHtml;
        }
    };

    var overrideCtx = {};
	overrideCtx.Templates = {};

	overrideCtx.Templates.Header = '<style type="text/css" >\
		.newsblock.twocolumns .News-Item {\
			float: left;\
			width: 49%;\
			min-height: 230px;\
		}\
		.newsphoto {\
			float: left;\
		}\
		.News-Item::after {\
			clear: both;\
			content: " ";\
			display: block;\
		}\
		div.News-Item {\
			border-bottom:1px #cecece solid;\
		}\
		img.NewsLogo {\
			margin: 5px;\
			border:1px solid #cecece;\
		}\
		// rule line for news web part title\
		h2.ms-webpart-titleText {\
			border-bottom:1px #333333 solid;\
		}\
		// spacing for content and photo \
		// div.newsphoto, div.newscontent {\
		// 	margin-bottom:10px;\
		// }\
		// font styling\
		a.newsTitle:link, a.newsTitle:visited, a.newsTitle:active, a.newsTitle:hover {\
			font-size:15px;\
		}\
		span.newsDate {\
			font-size:11px;\
			color:#999999;\
		}\
		span.newsReg {\
			font-size:11px;\
			color:#999999;\
		}\
		td.td-newstitle {\
			padding:10px 5px 5px 0px;\
		}\
		// spacing form continue reading link\
		div.newscontent {\
			padding-bottom:0px;\
		}\
		.continue-br {\
			height:.1em;\
			margin:0px;\
		}\
		// remove nowrap on display form\
		.ms-formlabel-nowrap-override {\
			white-space:pre-wrap;\
		}\
		.ms-webpartPage-root {\
			border-spacing: 0px !important;\
		}\
	</style>\
	<div class="newsblock twocolumns">\
		<div class="News" style="border:0" width="100%">';
	overrideCtx.Templates.Item = projectsview.Item.customItemHtml;
	overrideCtx.Templates.Footer = "</div></div>";
    overrideCtx.ListTemplateType = 301;
    overrideCtx.BaseViewID = 3984;
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
	ExecuteOrDelayUntilScriptLoaded(function(){
	
	    //Take a copy of the existing Microsoft Definition of RenderListView
	    var oldRenderListView = RenderListView;
	
	    //Now redefine RenderListView with our override
	    RenderListView = function (overrideContext, webPartID)
	    {
	        //Check the context of the currently rendering List view
	        if (overrideContext.ListTitle == 'Проекты')
	        {
                //Override the BaseViewID if it's the one we want.
                ctx.BaseViewID = 3984;
	        }
	
	    //now call the original RenderListView
	        oldRenderListView(overrideContext, webPartID);
		}
	
	}, 'ClientTemplates.js');
})();
function openNewWindow(url) {
	window.open(url)
	
}

