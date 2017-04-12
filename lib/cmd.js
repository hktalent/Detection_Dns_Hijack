var child_process = require("child_process");
 const aD = "123.125.114.144,180.149.132.47,220.181.57.217,111.13.101.208".split(/[,;\t\s]/);

// exec cmd;执行命令
function doCmd(opt)
{
	return child_process.spawnSync("host",["baidu.com","|grep '\\d*\\.\\d*\\.\\d*\\.\\d*'|awk '{print $4;}'"],opt);
}

// find Detection dns Hijack so cbk
function detectionDnsHijack(fnCbk)
{
	var abc = function()
	{
		var opt = {"encoding": "utf8","shell":true};
		var o = doCmd(opt),aHijack = [];
		if(o.stdout)
		{
			o = o.stdout.trim().split(/\n/),i = 0;

			o.forEach(function(v)
			{
				if(-1 < aD.indexOf(v))i++;
				else aHijack.push(v);
				return v
			});
			if(fnCbk && o.length != i)fnCbk(aHijack);
		}
	},ab1 = function()
	{
		abc();
		setTimeout(ab1,5);
	};
	ab1();
}

exports = detectionDnsHijack;